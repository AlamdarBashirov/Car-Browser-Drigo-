1. How is your mock data layer set up, what functions does it expose, and how does it simulate latency, failure and persistence without a backend?
To set up the mock API, I created bookingsApi, carsApi, and authApi files inside the api folder, and wrote the corresponding functions for each domain—such as getCars, getCurrentUser, etc. Having previous experience building backends with Node.js, structuring these APIs felt familiar, so I didn't face much difficulty here. I built a delay utility to simulate artificial latency, used if conditions to trigger random failures, and persisted data in localStorage so that state isn't lost on page refreshes.

2. How do you make sure a slow earlier load never overwrites a newer one? Walk through a concrete race where, without your guard, stale results would show.
I implemented this specifically for the CarsSection and the getCars API overall. The logic works by assigning a unique ID to each outgoing request and saving that ID in state. When the API responds, the response's request ID is compared against the ID of the latest dispatched request. If they match, the state is updated; otherwise, the stale response is ignored. Without this guard, if a user types quickly in a search bar while network speed fluctuates, a delayed response from an earlier request could arrive last and overwrite the newer search results.

3. What's your caching strategy, and how do you invalidate the right cached data after a booking is created or cancelled so availability stays correct?
Due to the delay in starting the task (as I mentioned via email), I unfortunately haven't been able to implement this part yet. I plan to complete this along with the other remaining items by the end of Wednesday.

4. Where does your overlap / availability check live, how does it decide two date ranges conflict, and why did you put it there?
The overlap function lives in utils. Since this check needs to be performed multiple times across the app, keeping it in utils felt like the cleanest approach. The hasOverlap function accepts 4 parameters: the start and end dates of the requested rental, and the start and end dates of existing bookings for that car. If there is any date collision between these ranges, hasOverlap flags a conflict.

5. Which app-state solution did you choose and why? What stays in the URL, what lives in app state, and how do you justify that split?
I chose Redux because I have prior experience with it and feel very comfortable writing code with it. Global state like user, bookings, and cars lives in Redux, while search parameters, page numbers, and filters stay in the URL. Keeping filters in the URL makes the state shareable—allowing other users to view the exact same filtered state via a link—and ensures that filter state persists across page refreshes.

6. How does the protected-route + return-to-intended-page flow work after sign-in?
I created a ProtectedRoute component to wrap restricted routes. To preserve the intended destination, the target URL is captured using the useLocation hook when an unauthorized user attempts access. On the SignIn page, this saved location is read, and upon successful authentication, the user is automatically redirected back to that original URL.

7. Describe one accessibility decision (e.g. focus management on dialog open) and one performance decision you actually measured.
Accessibility: Due to time constraints, I couldn't dedicate as much time here as I wanted to for caching, but I aimed to maintain core accessibility by pairing every input with an explicit <label>, wrapping registration forms in <form> tags, and managing submit logic through onSubmit. I will address the remaining gap here by the end of Wednesday.

Performance: I applied a "latest request wins" approach. As explained earlier, each request ID is stored in state and compared upon response. If the arriving ID does not match the latest request ID, the state update is dropped, preventing redundant renders and race condition UI bugs.

8. If you had three more days, what is the first thing you'd refactor or the most important test you'd add, and why?
If I had three more days, beyond meeting the core requirements, I would build an availability calendar for the cars. I would also add time selection during the booking flow, which currently only supports dates. Additionally, if a car is booked for the current date, I would update its real-time availability status on the home page to reflect as unavailable.