const $ = id => document.getElementById(id);
$("generate").onclick = async () => {
  $("generate").disabled = true;
  $("generate").textContent = "Generating...";
  try {
    const r = await fetch("/api/prompt", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        subject: $("subject").value,
        action: $("action").value,
        style: $("style").value,
        duration: $("duration").value,
        ratio: $("ratio").value
      })
    });
    const data = await r.json();
    $("prompt").textContent = data.prompt;
    $("result").classList.remove("hidden");
  } catch(e) {
    alert("Could not generate prompt.");
  } finally {
    $("generate").disabled = false;
    $("generate").textContent = "✨ Generate Trex Prompt";
  }
};
$("copy").onclick = async () => {
  await navigator.clipboard.writeText($("prompt").textContent);
  $("copy").textContent = "✅ Copied";
  setTimeout(() => $("copy").textContent = "📋 Copy", 1400);
};
