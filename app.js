const container = document.getElementById("container");
fetch("https://jsonplaceholder.typicode.com/posts")
	.then((response) => response.json())
	.then((data) => {
		const posts = data;

		posts.map((post, i) => {
			if (i % 3 === 0) {
				const row = document.createElement("div");
				row.classList.add("row");

				container.appendChild(row);
			}
			const row = container.lastElementChild;
			const col = document.createElement("div");
			col.classList.add("col-md-4");
			col.classList.add("mb-3");
			row.appendChild(col);
			const div = document.createElement("div");
			div.classList.add("card");
			div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title text-truncate">${post.title}</h5>
                <p class="card-text text-truncate">${post.body}</p>
            </div>
            `;
			col.appendChild(div);
		});
	})
	.catch((error) => {
		console.error("Error: ", error);
	});
