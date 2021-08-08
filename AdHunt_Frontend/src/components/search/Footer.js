import React from "react";

function Footer(props) {
  return (
    <section>
      <div style={{ height: "50px" }} />
      <footer
        className="sticky-footer fixed-bottom bg-wood bc bottom-frame "
        style={{ backgroundColor: "#343a40" }}
      >
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>
              <font color="#9a9da0">
                Copyright &copy; Ad Hunt {new Date().getFullYear()}
              </font>
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
