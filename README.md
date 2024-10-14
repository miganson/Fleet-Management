1. **Is this database schema sufficient to satisfy the platform goals?**
   
   Yes, the schema seems covers the essential entities and relationships needed for an MVP.

   a. **If it does, are there any improvements that can be made to the schema?**
   
      - **Add a Rate Table:** Currently, I am hard coding the `PER_KM_RATE`. Instead of hard-coding `PER_KM_RATE` it would be better if a new table to store it is implemented. This allows for flexibility if rates change over time.
      
   c. **Are there any features you expect would be omitted for an MVP deployment, but consider important for long-term usage?**
   
      - **Audit Logs:** To track changes once the decision to add details using the Frontend is implemented.
      - **User Authentication Tables:** A way for permission settings on who can add and can connect to the audit logs as well.
      - **Maintenance Records:** A table to track detailed maintenance history of vehicles (oils used, parts used, parts removed, mechanic, etc.).

3. **Given the above use cases, what indices would you add?**
   
   - Index on `vehicle_trips (vehicle_id)`: to quickly locate all trips made by a vehicle.
   
5. **If we were to save the monthly report so that previous months’ and years’ reports would be available for documentary, accounting, and legal purposes, how would you implement that?**
   
   Feel free to suggest using components outside the database.
   
   - I would probably just have a brief detail for a quick overview. This can also be a new route.
   - Capture which driver is assigned to which vehicle for the reported month
   - Capture the specific route a vehicle was assigned to during the reporting month.
   
   ```sql
   CREATE TABLE monthly_reports (
     id serial PRIMARY KEY,
     report_month date NOT NULL,
     organization_id int REFERENCES organizations(id),
     driver_id int REFERENCES drivers(id),
     vehicle_id int REFERENCES vehicles(id),
     route_id int REFERENCES routes(id),
     total_distance NUMERIC(10, 2),
     total_trips int
   );
   ```

---

## Architecture Design

**If you were to implement the platform described above, how would you design it?**

I would design the platform using a client-server architecture since it seems to be a simple application and this looks like something a small business would use. Unless it's a complex enterprise system like the San Miguel Oil Depot, then I would not use microservice since it's too complex.

**How would the various components interact with one another?**

- **Frontend** (React.js, Vercel)
- **Backend** (Node.js + Express.js)
- **Database** (PostgreSQL, MongoDB)

1. **React components** make HTTP requests to the backend APIs to fetch or update data.
2. **Backend** receives requests from the frontend =>
   - Processes the requests by interacting with the database. =>
   - Sends responses back to the frontend with the requested data or confirmation of actions.

**What libraries and frameworks would you choose for it, and why?**

- **React.js:** It offers a component-based architecture, making the UI modular and reusable.
- **Vercel:** Vercel is one of the newest and latest front end services in the web right now that can oversimplify the front end process.
- **React Router:** For handling navigation within the single-page application.
- **Bootstrap or MUI:** Provides pre-designed components and responsive design out of the box, speeding up development.
