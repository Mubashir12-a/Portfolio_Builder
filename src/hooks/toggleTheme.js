export default function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");

  if (current === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById('toggle').innerHTML = '☀️';
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.getElementById('toggle').innerHTML = '🌙';
  }
}