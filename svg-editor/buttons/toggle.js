export default function toggle(tool) 
{
  var x = document.getElementById(tool);
  if (x.style.display === "none") 
  {
    x.style.display = "block";
  } 
  else 
  {
    x.style.display = "none";
  }
}