import "../styles/styles.css";

export function Footer() {
  return (
    <footer className="cci-footer">
      <div className="cci-footer__inner">
        <div className="cci-footer__brand">
          <h3>ual:</h3>
          <h4>Creative Computing Institute</h4>
        </div>
        <div className="cci-footer__section"></div>
        <div className="cci-footer__sections">
          <div className="cci-footer__section">
            <h3>Contact</h3>
            <p>
              <a href="mailto:cci@arts.ac.uk">cci@arts.ac.uk</a>
            </p>
          </div>

          <div className="cci-footer__section">
            <h3>Address</h3>
            <address>
              UAL Creative Computing Institute
              <br />
              45–65 Peckham Road
              <br />
              London
              <br />
              SE5 8UF
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
