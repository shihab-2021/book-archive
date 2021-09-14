//Function after click on search button
const btnClick = () => {
    const searchText = document.getElementById('search-text').value;
    spinnerDisplay('block');//For showing spinner
    previousResult('none');//For make invisible data at the time of showing spinner
    document.getElementById('show-result-number').textContent = '';
    // If user doesn't enter anything in input 
    if(searchText === '')
    {
        const resultNumber = document.getElementById('show-result-number');
        const subResultDiv = document.createElement('div');
        subResultDiv.innerHTML =`
        <div class="text-center my-5 py-5">
        <h1 class="text-warning">Please type valid search keyword.</h1>
        </div>
        `;
        resultNumber.appendChild(subResultDiv);
        spinnerDisplay('none');
    }
    else
    {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => showResult(data))
        .catch(error => displayError(error));//For the server error
    }
}
// Function for Spinner 
const spinnerDisplay = displaySpinner => {
    document.getElementById('spinner').style.display = displaySpinner;
};
// Function for Previous Result display setting 
const previousResult = displayResult => {
    document.getElementById('allResult').style.display = displayResult;
};
// Function for Server Error
const displayError = error => {
    window.alert("There is something wrong in server! Please try again later.");
    spinnerDisplay('none');
}
// Function to show the expected search result 
const showResult = (data) => {
    document.getElementById('search-text').value = '';
    const results = data.docs;// separating docs in a variable
    spinnerDisplay('none');// Spinner display setting 
    previousResult('block');
    let sum = 0;
    const resultDiv = document.getElementById('show-result');
    resultDiv.textContent = '';
    // Array for showing search result
    results.slice(0,20).forEach((result) => {
        const subResultDiv = document.createElement('div');
        subResultDiv.innerHTML = `
        <div style="height: 650px" class="card shadow-lg rounded">

            <img style="height: 400px" src="https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg" class="card-img-top" alt="...">
            
            <div class="card-body">

                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Book Name : <span   class="text-secondary">${result.title?result.title.slice(0,25): "Name not found!"}</span></li>
                    <li class="list-group-item">Author Name : <span     class="text-secondary">${result.author_name?result.author_name[0]: "Author not found!"}</span></li>
                    <li class="list-group-item">Publisher : <span   class="text-secondary">${result.publisher?result.publisher[0]: "Publisher not found!"}</span></li>
                    <li class="list-group-item">First Publish Year : <span  class="text-secondary">${result.first_publish_year?result.   first_publish_year: "Year not found!"}</span></li>
                </ul>

            </div>
        `;
        resultDiv.appendChild(subResultDiv);
        sum++;
    });
    // If user enter wrong search keyword and can't find result
    if(sum === 0)
    {
        const resultNumber = document.getElementById('show-result-number');
        const subResultDiv = document.createElement('div');
        subResultDiv.innerHTML =`
        <div class="text-center my-5 py-5">
        <h1 class="text-danger">Search input not found!</h1>
        <h4 class="text-warning">Please type valid search keyword.</h4>
        </div>
        `;
        resultNumber.appendChild(subResultDiv);
    }
    else
    {
        const resultNumber = document.getElementById('show-result-number');
        const subResultDiv = document.createElement('div');
        subResultDiv.innerHTML =`
        <h6 class="mb-4">Total Number of Result: ${data.numFound}</h6>
        `;
        resultNumber.appendChild(subResultDiv);
    }
}