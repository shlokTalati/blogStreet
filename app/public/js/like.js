document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const postId = button.dataset.postId;
        const isLiked = button.dataset.isLiked
        try {
            const res = await fetch('/like/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({ postId, isLiked })
            });

            const data = await res.json();
            console.log(data.message);

            if (res.ok) {
                const icon = button.querySelector('svg');

                if (icon.dataset.prefix === "far") {
                    icon.dataset.prefix = "fas"
                    button.dataset.isLiked = "true"
                } else {
                    icon.dataset.prefix = "far"
                    button.dataset.isLiked = "false"
                }

            }
        } catch (err) {
            console.error(err);
        }
    });
});
