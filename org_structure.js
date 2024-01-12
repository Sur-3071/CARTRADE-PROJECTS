
s = {}
m = {}
data = [
	{
		"id": "01",
		"name": "Satish",
		"des": "Admin",
		"manager_id": -1
	},
	{
		"id": "02",
		"name": "Suresh",
		"des": "Accountant",
		"manager_id": 1
	},
	{
		"id": "03",
		"name": "Ganesh",
		"des": "HR",
		"manager_id": 1
	},
	{
		"id": "04",
		"name": "Mahesh",
		"des": "TL",
		"manager_id": 1
	},
	{
		"id": "05",
		"name": "Kamesh",
		"des": "Sr Programmer",
		"manager_id": 4
	},
	{
		"id": "06",
		"name": "Kamalesh",
		"des": "Sr Programmer",
		"manager_id": 4
	},
	{
		"id": "07",
		"name": "veeresh",
		"des": "Jr Programmer",
		"manager_id": 5
	},
	{
		"id": "08",
		"name": "Ramesh",
		"des": "Jr Programmer",
		"manager_id": 6
	},
	{
		"id": "09",
		"name": "Venkatesh",
		"des": "Jr Programmer",
		"manager_id": 6
	},
	{
		"id": "10",
		"name": "Mangesh",
		"des": "Jr Programmer",
		"manager_id": 6
	}

];
for (var i = 0; i < data.length; i++) {
	s[(data[i]['id'])] = []
}
for (var i = 0; i < data.length; i++) {
	for (var j = i + 1; j < data.length; j++) {
		if (data[i]['id'] == data[j]['manager_id']) {
			s[(data[i]['id'])].push(data[j]['id'])
		}
	}
}
emp = {}
for (var i = 0; i < data.length; i++) {

	emp[data[i]["id"]] = [data[i]["name"], data[i]["des"]];
}
for (var j in s) {
	if (s[j].length > 0) {
		m[j] = s[j]
	}
}
function recursion(id, par) {

    if ((id in m) === true) {
        var ul = document.createElement('ul');

        for (var i = 0; i < m[id].length; i++) {
            var cid = m[id][i];
            let p = document.createElement("li");
            p.innerHTML = emp[cid][0]+"====>"+emp[cid][1]

            ul.appendChild(p);
            x = recursion(cid, p);
        }
        par.appendChild(ul);
    }
    else
	{
        return 0;
    }
}

var ul = document.getElementById("list");
var l = document.createElement("li");
l.innerHTML = "Satish====>Admin";

x = recursion("01", l);
ul.appendChild(l);