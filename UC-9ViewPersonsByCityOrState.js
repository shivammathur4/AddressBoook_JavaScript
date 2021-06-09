class contact
{
    constructor(...params)
    {
        this.firstName= params[0];
        this.lastName= params[1];
        this.address= params[2];
        this.city= params[3];
        this.state= params[4];
        this.zip= params[5];
        this.phoneNumber= params[6];
        this.email= params[7];
    }

    get firstName()
    {
        return this._firstName;
    }
    set firstName(firstName)
    {
        let nameRegex= RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(firstName))
            this._firstName= firstName;
        else throw "Invalid firstname";
    }

    get lastName()
    {
        return this._lastName;
    }
    set lastName(lastName)
    {
        let nameRegex= RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(lastName))
            this._lastName= lastName;
        else throw "Invalid lastname";
    }

    get address()
    {
        return this._address;
    }
    set address(address)
    {
        let addressRegex= RegExp('^[A-Za-z0-9]{4,}$');
        if(addressRegex.test(address))
            this._address= address;
        else throw "Invalid address";
    }

    get city()
    {
        return this._city;
    }
    set city(city)
    {
        let cityRegex= RegExp('^[A-Za-z]{4,}$');
        if(cityRegex.test(city))
            this._city= city;
        else throw "Invalid city";
    }

    get state()
    {
        return this._state;
    }
    set state(state)
    {
        let stateRegex= RegExp('^[A-Za-z]{4,}$');
        if(stateRegex.test(state))
            this._state= state;
        else throw "Invalid state";
    }

    get zip()
    {
        return this._zip;
    }
    set zip(zip)
    {
        let zipRegex= RegExp('^[0-9]{3}[ ]?[0-9]{3}$');
        if(zipRegex.test(zip))
            this._zip= zip;
        else throw "Invalid zip";
    }

    get phoneNumber()
    {
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber)
    {
        let phoneNumberRegex= RegExp('^([0-9]{2}[ ])?[6-9]{1}[0-9]{9}$');
        if(phoneNumberRegex.test(phoneNumber))
            this._phoneNumber= phoneNumber;
        else throw "Invalid phone number";   
    }

    get email()
    {
        return this._email;
    }
    set email(email)
    {
        let emailRegex= RegExp('^[a-zA-Z0-9]+([-.+_#$][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$')
        if(emailRegex.test(email))
            this._email = email;
        else throw "Invalid Email";
    }

    toString()
    {
        return "\nFirst Name: " + this.firstName + "\nLast Name: " + this.lastName + "\nAddress: " + this.address + "\nCity: " + this.city 
        + "\nState: " + this.state + "\nZipcode: " + this.zip + "\nPhone Number: " + this.phoneNumber + "\nEmail: " + this.email; 
    }
}

function AddContact(firstName, lastName, address, city, state, zip, phoneNumber, email)
{
    try
    {
        let newcontact = new contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        if(AddressBook.find(person => person.firstName == newcontact.firstName && person.lastName==newcontact.lastName))
            throw "Details you are entering already exists";
        else
        {
            AddressBook.push(newcontact);        
        }
    }
    catch(e)
    {
        console.error(e);
    }
}

function EditContact(firstName, lastName, address, city, state)
{
    AddressBook.filter(contact=>contact.firstName== firstName && contact.lastName == lastName ).forEach(contact=>{contact.address = address ; contact.city= city ; contact.state= state});
}

function DeleteContact(firstName, lastName)
{
    for(let index = 0; index < AddressBook.length; index++)
    {
        if(AddressBook[index].firstName == firstName && AddressBook[index].lastName==lastName)
        {
            AddressBook.splice(index,1);
        }
    }   
}

function SearchByCityAndState(city, state)
{
    let sortByCity = AddressBook.filter(contact=>contact.city == city && contact.state == state);
    return sortByCity;
}

function Delete()
{
    console.log("Hello, Welcome To Address Book Using Javascript!")
    console.log("----------------Adding contact-----------------");
    AddContact("Ramya","Uday","Vijaynagar","Bangalore","Karnataka","567678","91 9898989898","ramya@gmail.com");
    AddContact("Ramya","Uday","Vijaynagar","Bangalore","Karnataka","567678","91 9898989898","ramya@gmail.com");
    AddContact("Riya", "Wooj", "Nagarbhavi", "Mangalore", "Mumbai", "588678", "91 8765432345", "riya@gmail.com");
    AddContact("Disha", "Madan", "Graden", "Gubbi", "Andhra", "593678", "91 9842123456", "disha@gmail.com");
    AddContact("Rohan", "Sharma", "Bandish", "Bandits", "Rajasthan", "532678", "91 7854567890", "rohan@gmail.com");
    AddContact("Ryan", "Dharma", "Bandish", "Bandits", "Jodhpur", "532105", "91 9876543210", "ryan@gmail.com");
    AddressBook.forEach(contact=>console.log(contact.toString()));
    console.log("-------------Editing contact-----------------");
    AddressBook.filter(contact=>contact.firstName=="Ramya"&& contact.lastName =="Uday").forEach(contact=>{contact.address ="DamohNaka"; contact.city="Bangalore"; contact.state="Karnataka"});
    AddressBook.forEach(contact=>console.log(contact.toString()));
    console.log("-------------Deleting contact-----------------");
    DeleteContact("Ramya", "Uday");
    console.log("Contact deleted successfully!")
    AddressBook.forEach(contact=>console.log(contact.toString()));
    console.log("-----------------Searching by city---------------");
    let cityArray = SearchByCityAndState("Bandits", "Jodhpur");
    cityArray.forEach(contact=>console.log(contact.toString()));
}

let AddressBook = new Array();
Delete();

let addressBookCount= AddressBook.reduce((count,_contact)=>count= count+1,0);
console.log("Count of address book contacts are : "+addressBookCount);

console.log("\n -------------Contacts present in city-------------");
viewPersonsInACityOrState("Bandits");
function viewPersonsInACityOrState(city)
{
    AddressBook.filter(contact=>contact.city==city).forEach(contact=>console.log(contact.toString()));
}

