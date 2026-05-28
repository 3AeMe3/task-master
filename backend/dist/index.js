import app from "./app.js";
const PORT = process.env.PORT || 4000;
// Start only when running as a standalone server (local development)
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map