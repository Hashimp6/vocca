import AppBar from "../../components/user/AppBar";
import CarouselComponent from "../../components/user/CaroselComponent";
import ShopByCategory from "../../components/user/Catagory";
import Footer from "../../components/user/Footer";
import NewArrivals from "../../components/user/NewArrivals";

function Home() {
  return (
    <div>
      <AppBar />
      <CarouselComponent />
      <NewArrivals />
      <ShopByCategory />
      <Footer />
    </div>
  );
}

export default Home;
