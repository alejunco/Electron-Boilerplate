
const os = require('os');

var getMacAddres = function()
{
    var keys = ['Ethernet','Wireless80211','GigabitEthernet','FastEthernetT'];

    var result;
    var interfaces = os.networkInterfaces();
    for(var key in interfaces)
    {
        if(interfaces.hasOwnProperty(key) &&  keys.find(k => k == key))
        {
            result = interfaces[key].find(x=> x.family === "IPv4").mac;
            if(result)
            {
                // console.log(result);
                return result;
            }
        }
    }
};

module.exports = {
    getMacAddres: getMacAddres
};


// getMacAddres();
