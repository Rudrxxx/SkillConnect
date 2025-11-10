document.getElementById("openApp").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://SkillConnect.vercel.app/" });
  
});
