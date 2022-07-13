import React, { useState } from 'react';
import { InputGroup, FormControl, Dropdown, FormCheck } from 'react-bootstrap';
import { BsFunnelFill } from 'react-icons/bs';
import { stateList } from '../../../constants';

const StateDropdown = ({ selectedStateList, onChangeStateList }) => {
  const [show, setShow] = useState(false);

  const renderStateItems = () =>
    stateList.map((stateItem) => (
      <div
        key={stateItem.name}
        className="dropdown-item"
        onClick={() => {
          onChangeStateList(stateItem.name);
        }}
        role="presentation"
      >
        <FormCheck
          label={stateItem.name}
          checked={selectedStateList.includes(stateItem.name)}
          onChange={() => {}}
        />
      </div>
    ));

  const generateStateTitle = () => {
    let ans = '';

    for (let i = 0; i < selectedStateList.length; i += 1) {
      const selectedStateItem = selectedStateList[i];

      if (i === selectedStateList.length - 1) {
        ans += selectedStateItem;
        // eslint-disable-next-line no-continue
        continue;
      }

      ans += `${selectedStateItem}, `;
    }

    return ans;
  };

  return (
    <div className="input-with-dropdown">
      <InputGroup className="mb-3">
        <FormControl placeholder="Type" value={generateStateTitle()} />

        <Dropdown show={show}>
          <Dropdown.Toggle onClick={() => setShow(!show)} id="dropdown-basic" variant="primary">
            <BsFunnelFill />
          </Dropdown.Toggle>

          <Dropdown.Menu>{renderStateItems()}</Dropdown.Menu>
        </Dropdown>
      </InputGroup>
    </div>
  );
};

export default StateDropdown;
