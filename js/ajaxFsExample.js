// rename me to ajaxFs.js

function ajaxGet() {
    $.ajax({
        url: "exampleUrl.com",
        type: "GET",
        success: function (data) {
            console.log(data.length)
            var length = data.length;
            var results = _.sortBy(data, function (num) {
                num = num.score.split('/');
                return parseInt(num[0])
            });
            for (var i = length - 1; i >= 0; i--) {
                console.log(i);
                document.getElementById('right-game').innerHTML = document.getElementById('right-game').innerHTML + '<span class="score">' + results[i].person + ': ' + results[i].score + '</span>';
            }
        }
    })
}

function ajaxPost() {
    console.log('ajax');
    $.ajax({
        url: "exampleUrl.com",
        data: JSON.stringify({
            person: name,
            score: (right.length + '/' + level.length)
        }),
        type: "POST",
        contentType: "application/json"
    });

}
