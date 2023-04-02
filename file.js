function movie() {
    fetch(`http://localhost:3000/films`)
      .then((res) => res.json())
      .then((data) => {
        const filmData = data;
        const filmsList = document.querySelector("#films");
  
        for (let i = 0; i < filmData.length; i++) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          li.classList.add("animate__animated", "animate__bounceInRight");

          a.href = "#";
          a.style.color = "white";
          a.style.textDecoration = "none";
  
          a.textContent = filmData[i].title;
          li.append(a);
          filmsList.appendChild(li);
  
          a.addEventListener("click", () => {
            const display = document.querySelector("#display");
            display.innerHTML = "";
  
            const title = document.createElement("h1");
            const poster = document.createElement("img");
            const description = document.createElement("p");
            const showTime = document.createElement("h4");
            const runtime = document.createElement("h4");
            const tickets = document.createElement("h4");
            const buy = document.createElement("button");
  
            buy.classList.add("btn", "btn-danger");
  
            title.textContent = filmData[i].title;
            poster.src = filmData[i].poster;
            description.textContent = `Description: ${filmData[i].description}`;
            showTime.textContent = `Movie starts at: ${filmData[i].showtime}`;
            runtime.textContent = `Duration: ${filmData[i].runtime} minutes`;
            tickets.textContent = `Tickets remaining: ${
              filmData[i].capacity - filmData[i].tickets_sold
            }`;
            buy.textContent = `BUY TICKET`;
            display.appendChild(title);
            display.appendChild(poster);
            display.appendChild(description);
            display.appendChild(showTime);
            display.appendChild(runtime);
            display.appendChild(buy);
            display.appendChild(tickets);
  
            buy.addEventListener("click", (event) => {
              filmData[i].tickets_sold++;
              const remainingTickets =
                filmData[i].capacity - filmData[i].tickets_sold;
  
              fetch(`http://localhost:3000/films/${filmData[i].id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tickets_sold: filmData[i].tickets_sold,
                }),
              })
                .then((response) => {
                  if (response.ok) {
                    tickets.textContent = `Tickets remaining: ${remainingTickets}`;
                  }
                })
                .catch((err) => console.log(err));
  
              tickets.textContent = `Tickets remaining: ${remainingTickets}`;
  
              event.preventDefault();
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
  
  movie();
  