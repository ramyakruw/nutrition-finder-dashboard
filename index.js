$(function() {
  $.get('https://nzgfcamazl.execute-api.us-east-1.amazonaws.com/dev/nutrition-finder-ui', function(data) {
    console.log(data);

    $.each(data, function(index, value) {
      var imageUrl = value.imageUrl.S;
      var foodName =  value.foodName.S;
      var time = timeSince(value.DateTime.N);
      var nutritionFacts = JSON.parse(value.nutritionFacts.S);

      $('#items > div:nth-child(' + ((index%4)+1) + ')').append(
        "  <div class=\"card\">"
        + "     <img class=\"img-fluid\" src=\"" + imageUrl + "\" alt=\"\">"
        + "    <div class=\"card-body\">"
        + "      <div>"
        + "        <h2 class=\" title-large\"><a href=\"#\">" + foodName + "</a></h2>"
        + "        <p>Serving: " + nutritionFacts.nf_serving_size_qty + "<br/>"
        + "         Calories: " + nutritionFacts.nf_calories + "<br/>"
        + "         Total Fat: " + nutritionFacts.nf_total_fat + "</p>"
        + "      </div>"
        + "      <p class=\"card-text\"><small class=\"text-time\"><em>" + time + " ago</em></small></p>"
        + "    </div>"
        + "</div>"
      );
    });
  });
});

function timeSince(utcSeconds) {
  var date = new Date(parseInt(utcSeconds));

  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
