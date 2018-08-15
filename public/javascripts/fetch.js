$(document).ready(function () {
 
 $('#retrieve-resources').click(function () {
 var displayResources = $('#display-resources');
 
 displayResources.text('Loading data from JSON source...');
 
 $.ajax({
 type: "GET",
 url: "/worldlist",
 success: function(result)
 {
 console.log(result);
 var output="<table><thead><tr><th>World Name</th><th>World ID</th><th>Uploaded By</th></thead><tbody>";
 for (var i in result)
 {
 output+="<tr><td>" + result[i].world_name + "</td><td>" + result[i].world_id + "</td><td>" + result[i].image_url + "</td></tr>";
 }
 output+="</tbody></table>";
 
 displayResources.html(output);
 $("worlds").addClass("table");
 }
 });
 
 });
});