import "./Contactus.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillGeoAltFill,BsFillEnvelopeFill,BsFillTelephoneFill} from "react-icons/bs";
import { useRef } from "react";
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';
export default function (props) {
  
  /* emailjs browser */
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_bpr7iqr",
      "template_a2o13ii", 
      form.current, 
      "1A8SoZKzTfGXMB3TH")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  
      /* popup  start*/
      swal({
        title: "Thank you!",
        text: "Your Response was sended!",
        icon: "success",
        button: "ok",
      });
      /*popup end */

 };
  /* emailjs browser */

  return (
  <div className="image">
    <div className="Con-form-container">
  
      <div class="contact-section">
        <div class="contact-info"> 
          <div><i>< BsFillGeoAltFill /></i>Amizhth Techno Solutions, Madurai, India</div>
          <div><i>< BsFillEnvelopeFill/></i>prasathnantha10_mca24@mepcoeng.ac.in</div>
          <div><i>< BsFillTelephoneFill /></i>+91 9876543210</div>
          
        </div>
      </div>

      <form ref={form} onSubmit={sendEmail}  className="Con-form">
        <div className="Con-form-content">
          <h3 className="Con-form-title">Contact Us</h3> 
         
          <div className="form-group mt-3">
            <labell> Name</labell>
            <input type="text" name="user_name" className="form-control mt-1" placeholder="Enter your Name" required/>
          </div>
            
          <div className="form-group mt-3">
            <labell>Email</labell>
            <input type="email" name="user_email" className="form-control mt-1" placeholder="Email Address" required />
          </div>

          <div className="form-group mt-3">
            <labell>Subject</labell>
            <input type="text" name="subject" className="form-control mt-1" placeholder="Subject" required />
          </div>
            
          <div className="form-group mt-3">
            <labell>Message</labell>
            <input type="text" name="message" className="form-control mt-1" placeholder="Type here...." required />
           
          </div>
             
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-info">
              Submit
            </button>    
          </div>
          
        </div>
      </form>
    </div>
  </div>
  )
}