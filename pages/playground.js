import CommingSoon from "../src/components/CommingSoon";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

const Playground = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <CommingSoon />
      <Footer />
    </div>
  )
}

export default Playground;