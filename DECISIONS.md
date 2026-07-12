When the data is loaded for the first time, the loading state becomes true and a loading message is displayed on the screen. If the request fails, the error state is updated and the user sees a Retry button. If the request is successful but returns no results, or no cars match the selected filters, the empty state is shown. Clicking the Retry button starts the same request again, enables the loading state, clears the previous error, and reloads the data.

When the user clicks on a car card, React Router adds the car's ID to the URL. The detail page reads this ID using useParams, loads the data again, and finds the matching car. Because of this, the page continues to work even after a refresh. If no car is found for the given ID, a "Car not found" message is displayed.

The filters, sorting, and current page are stored in the URL query parameters. When the user goes back from the detail page, React Router restores the previous URL, and the component reads its state from those query parameters again. This allows the user to return to the exact same view.

As the number of filters increased, using multiple useState hooks made the code harder to manage. I switched to useReducer so that all filter-related state could be handled in one place. Since every change is managed through actions, the code became cleaner, easier to read, and easier to extend.

When the component loads, it reads all filter values from the URL query parameters and uses them as the reducer's initial state. Whenever the state changes, the URL is updated as well. Since the URL is only updated when the state changes, the state and URL stay synchronized without causing an infinite loop.

If I had one more day, the first thing I would do is add more unit tests. I would especially test pagination, URL synchronization, and the favorites functionality. I would also split some larger components into smaller reusable ones to improve readability and maintainability.

The only part I couldn't fully complete was the pagination behavior where refreshing the page should keep the current page and invalid page numbers should automatically be clamped to the nearest valid page. I ran into a small issue with that part, and because of my health I wasn't able to spend enough time to finish it before the deadline.

This was also my first time writing unit tests in a project. I used AI as a learning aid to better understand how to structure and write them, while making sure I understood the final code. The favorites feature was also a bit challenging, but I had implemented a similar idea in one of my previous projects, so I was able to adapt that approach here.