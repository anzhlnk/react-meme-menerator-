/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [text, setText] = useState({
    topText: '',
    bottomText: '',
  });

  const [allData, setAllData] = useState([]);
  const arrayOfLinks = [];
  const [customerTemplate, setCustomerTemplate] = useState('');

  //Version1
  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setAllData(response);
      })
      .catch(() => {
        return 'Error';
      });
  }, []);

  for (let i = 0; i < allData.length; i++) {
    arrayOfLinks.push(allData[i].blank);
  }

  const [image, setImage] = useState(
    'https://api.memegen.link/images/grumpycat.png',
  );

  console.log(image);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submitted');
      }}
    >
      <label>
        Top text{' '}
        <input
          type="text"
          name="topText"
          placeholder="Add Top Text"
          onChange={(event) => {
            setText({
              ...text,
              [event.target.name]: event.target.value,
            });
          }}
          value={text.topText}
        />
      </label>
      <br />
      <br />
      <label>
        Bottom text
        <input
          type="text"
          name="bottomText"
          placeholder="Add Bottom Text"
          onChange={(event) => {
            setText({
              ...text,
              [event.target.name]: event.target.value,
            });
          }}
          value={text.bottomText}
        />
      </label>
      <br />
      <br />
      <label>
        Meme template
        <input
          type="text"
          name="image"
          placeholder="Add template"
          onChange={(event) => {
            setCustomerTemplate(event.target.value);
          }}
        />
      </label>
      <button
        onClick={() => {
          customerTemplate === ''
            ? setImage(
                arrayOfLinks[Math.floor(Math.random() * arrayOfLinks.length)],
              )
            : setImage(
                `https://api.memegen.link/images/${customerTemplate}.png`,
              );
        }}
      >
        Generate
      </button>
      <button>Download</button>
      <br />
      <img src={image} alt="meme" />
    </form>
  );
}
