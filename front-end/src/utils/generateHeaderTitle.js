/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import shortid from 'shortid';

export const generateHeaderTitle = (headerTitleArray) => {
  const returnedArr = [];

  for (let i = 0; i < headerTitleArray.length; i += 1) {
    const headerTitleItem = headerTitleArray[i];
    if (i > 0) {
      returnedArr.push(
        <h4 key={shortid.generate()} className="header-title__arrow">
          {'>'}
        </h4>
      );
    }
    returnedArr.push(<h4 key={shortid.generate()}>{headerTitleItem}</h4>);
  }

  return returnedArr;
};
