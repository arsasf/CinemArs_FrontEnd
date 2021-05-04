// import { Component } from "react";
// // import countries from "./countries";
// import { Button, Modal, Input, ListGroup } from "bootstrap";

// class SearchPage extends Component {
//   state = {
//     dataSet: countries,
//     filteredSet: countries,
//     searchValue: "",
//     modalOpen: false,
//   };

//   handleSearch = (event) =>
//     this.setState({ searchValue: event.target.value }, () =>
//       this.searchForCountry()
//     );

//   searchForCountry = () => {
//     this.setState((prevState) => {
//       const filteredSet = prevState.dataSet.filter((item) =>
//         item.toLowerCase().match(this.state.searchValue.toLowerCase())
//       );
//       return { filteredSet };
//     });
//   };

//   toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

//   render() {
//     return (
//       <div>
//         <Button onClick={this.toggleModal}>Click to open search modal</Button>

//         <Modal.Dialog
//           isOpen={this.state.modalOpen}
//           toggle={this.toggleModal}
//           backdrop={false}
//           size="sm"
//           side
//           position="top-right"
//         >
//           <Modal.Header toggle={this.toggleModal}>Modal title</Modal.Header>
//           <Modal.Body>
//             <Input
//               value={this.state.searchValue}
//               onChange={this.handleSearch}
//               hint="Search for country"
//               type="text"
//               containerClass="mt-0"
//             />
//             <ListGroup>
//               {this.state.filteredSet.map((item) => (
//                 <ListGroup.Item key={item}>{item}</ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button color="secondary" onClick={this.toggleModal}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal.Dialog>
//       </div>
//     );
//   }
// }

// export default SearchPage;
