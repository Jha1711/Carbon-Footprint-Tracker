async function calculate() {

    const electricity = document.getElementById('electricity').value;
    const car = document.getElementById('car').value;
    const flight = document.getElementById('flight').value;

    const response = await fetch('http://localhost:5000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            electricity,
            car,
            flight
        })
    });

    const data = await response.json();

    document.getElementById('result').innerText = data.total;

    loadHistory();
}

async function loadHistory() {
    const response = await fetch('http://localhost:5000/data');
    const records = await response.json();

    const history = document.getElementById('history');
    history.innerHTML = "";

    records.forEach(record => {
        const li = document.createElement('li');
        li.innerText = `Total: ${record.total} kg CO2`;
        history.appendChild(li);
    });
}

loadHistory();
