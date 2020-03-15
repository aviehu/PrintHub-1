const shareData = {
    title: 'MDN',
    text: 'Learn web development on MDN!',
    url: 'https://developer.mozilla.org',
};
const btn = document.querySelector('#share-button');

btn.addEventListener('click', async () => {
    await navigator.share(shareData);
});