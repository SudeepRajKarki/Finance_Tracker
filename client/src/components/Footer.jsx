import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <p>&copy; 2025 Sudeep Raj Karki. All Rights Reserved.</p>
        <div className="flex justify-center gap-6 text-lg">
          <a
            href="https://twitter.com/Stranger_me03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.facebook.com/karki.sudip.16/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.instagram.com/stranger_me_03/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://github.com/Strangerme03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/sudeep-raj-karki-15ab77238/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
