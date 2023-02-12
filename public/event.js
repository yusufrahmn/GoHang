function copy() {
    let message = document.getElementById('message');
    message.select();
    message.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(message.value);

    let copyButton = document.getElementById('copyButton');
    copyButton.innerHTML = 'Copied!';
}
