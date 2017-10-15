pragma solidity ^0.4.11;

// This is the base contract that your contract  extends from.
contract BaseRegistry {

    // The owner of this registry.
    address public owner = msg.sender;

    uint public creationTime = now;

    // This struct keeps all data for a Record.
    struct Record {
        // Keeps the address of this record creator.
        address owner;
        // Keeps the time when this record was created.
        uint time;
        // Keeps the index of the keys array for fast lookup
        uint keysIndex;
        string name;
        string specialty;
    }

    // This mapping keeps the records of this Registry.
    mapping(address => Record) records;

    // Keeps the total numbers of records in this Registry.
    uint public numRecords;

    // Keeps a list of all keys to interate the records.
    address[] public keys;


    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _;
    }



    // This is the function that actually insert a record.
    function register(address key, string name, string specialty) {
        if (records[key].time == 0) {
            records[key].time = now;
            records[key].owner = msg.sender;
            records[key].keysIndex = keys.length;
            keys.length++;
            keys[keys.length - 1] = key;
            records[key].name = name;
            records[key].specialty = specialty;
            numRecords++;
        } else {
            throw;
        }
    }

    // Updates the values of the given record.
    function update(address key, string name, string specialty) {
        // Only the owner can update his record.
        if (records[key].owner == msg.sender) {
            records[key].name = name;
            records[key].specialty = specialty;
        }
    }

    // Unregister a given record
    function unregister(address key) {
        if (records[key].owner == msg.sender) {
            uint keysIndex = records[key].keysIndex;
            delete records[key];
            numRecords--;
            keys[keysIndex] = keys[keys.length - 1];
            records[keys[keysIndex]].keysIndex = keysIndex;
            keys.length--;
        }
    }

    // Transfer ownership of a given record.
    function transfer(address key, address newOwner) {
        if (records[key].owner == msg.sender) {
            records[key].owner = newOwner;
        } else {
            throw;
        }
    }

    // Tells whether a given key is registered.
    function isRegistered(address key) constant returns(bool) {
        return records[key].time != 0;
    }

    function getRecordAtIndex(uint rindex) constant returns(address key, address owner, uint time, string name, string specialty) {
        Record record = records[keys[rindex]];
        key = keys[rindex];
        owner = record.owner;
        time = record.time;
        name = record.name;
        specialty = record.specialty;
    }

    function getRecord(address key) constant returns(address owner, uint time, string name, string specialty) {
        Record record = records[key];
        owner = record.owner;
        time = record.time;
        name = record.name;
        specialty = record.specialty;
    }

    // Returns the owner of the given record. The owner could also be get
    // by using the function getRecord but in that case all record attributes
    // are returned.
    function getOwner(address key) constant returns(address) {
        return records[key].owner;
    }

    // Returns the registration time of the given record. The time could also
    // be get by using the function getRecord but in that case all record attributes
    // are returned.
    function getTime(address key) constant returns(uint) {
        return records[key].time;
    }

    // Registry owner can use this function to withdraw any value owned by
    // the registry.
    function withdraw(address to, uint value) onlyOwner {
        if (!to.send(value)) throw;
    }

    function kill() onlyOwner {
        suicide(owner);
    }
}
