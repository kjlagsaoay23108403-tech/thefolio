import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Quiz from '../components/Quiz';

const About = ({ toggleDarkMode, darkMode }) => {
  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <section>
          <h2>My Drawing Journey</h2>
          <p>
            I started drawing using simple pencils and paper.
            Over time, I practiced regularly and slowly improved my skills.
            Drawing became a way for me to relax and express my ideas.
          </p>

          <table className="about-image-table">
            <tbody>
              <tr>
                <td>
                  <img src="/pic/251c416d-654b-49f3-b116-ec89d3902668.jpg" alt="Drawing 1" />
                </td>
                <td>
                  <img src="/pic/f9435547-0e7e-452e-9427-1547211cb961.jpg" alt="Drawing 2" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>My Learning Timeline</h2>
          <ol>
            <li>Started drawing simple shapes</li>
            <li>Practiced shading and outlines</li>
            <li>Improved through continuous practice</li>
          </ol>
        </section>

        <section>
          <h2>My Information</h2>
          <p><strong>Name:</strong> Kai</p>
          <p><strong>Address:</strong> Canada</p>
          <p><strong>Facebook:</strong> Smith</p>
          <p><strong>Email:</strong> jordan.smith.design@gmail.com</p>
        </section>

        <blockquote>
          "Drawing is not what one sees, but what one can make others see."
        </blockquote>

        <Quiz />
      </main>
      <Footer />
    </>
  );
};

export default About;