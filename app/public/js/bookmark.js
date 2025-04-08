document.querySelectorAll('.bookmark-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const postId = button.dataset.postId;
        const isBookmarked = button.dataset.isBookmarked
        try {
            const res = await fetch('/bookmark/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({ postId, isBookmarked })
            });

            const data = await res.json();
            console.log(data.message);

            if (res.ok) {
                const icon = button.querySelector('svg');

                if (icon.dataset.prefix === "far") {
                    icon.dataset.prefix = "fas"
                    button.dataset.isBookmarked = "true"
                } else {
                    icon.dataset.prefix = "far"
                    button.dataset.isBookmarked = "false"
                }

            }
        } catch (err) {
            console.error(err);
        }
    });
});
