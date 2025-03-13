import { Container, Box, Button, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import KitchenIcon from "@mui/icons-material/Kitchen";
// import InfoIcon from "@mui/icons-material/Info";

const HomePage = () => {
    const img = "../src/img/home-cooking.jpg";

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to MyRecipeApp 🍽️
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
                    Discover and share amazing recipes! Whether you're a beginner or an expert, 
                    our collection of recipes will inspire your next meal.
                </Typography>
                <Box 
                    component="img"
                    src={img}
                    alt="Cooking"
                    sx={{
                        width: "100%",
                        maxHeight: 300,
                        objectFit: "cover",
                        borderRadius: 2,
                        mb: 3,
                        border: "2px green solid"
                    }}
                />
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button
                        component={Link}
                        to="/recipes"
                        variant="contained"
                        color="primary"
                        startIcon={<KitchenIcon />}
                        sx={{ boxShadow: 2 }}
                    >
                        View Recipes
                    </Button>
                    <Button
                        component={Link}
                        to="/about"
                        variant="outlined"
                        color="secondary"
                        startIcon={<InfoIcon />}
                        sx={{ boxShadow: 2 }}
                    >
                        About Us
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
