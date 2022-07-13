import React, { useState } from 'react';
import { InputGroup, FormControl, Dropdown, FormCheck } from 'react-bootstrap';
import { BsFunnelFill } from 'react-icons/bs';
import { assignmentStates, enumAssignmentStateLowerCase } from '../../../utils';

const AssignmentStateDropdown = ({ selectedState, onChangeState }) => {
  const [show, setShow] = useState(false);

  const renderStateItems = () =>
    assignmentStates.map((stateItem) => (
      <div
        key={stateItem}
        className="dropdown-item"
        onClick={() => {
          onChangeState(stateItem);
        }}
        role="presentation"
      >
        <FormCheck
          label={enumAssignmentStateLowerCase[stateItem.toUpperCase()]}
          checked={selectedState === stateItem}
          onChange={() => {}}
        />
      </div>
    ));

  return (
    <div className="input-with-dropdown">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="State"
          value={
            selectedState.toUpperCase() === 'ALL'
              ? 'State'
              : enumAssignmentStateLowerCase[selectedState.toUpperCase()]
          }
        />

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

export default AssignmentStateDropdown;
