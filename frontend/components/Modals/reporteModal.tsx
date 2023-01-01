import React from "react";
import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import {useRecoilState} from "recoil";
  import {reporteModalState} from "../atoms/reporteModalAtom";

  
  const reporteModal:React.FC = () => {
    const [modalState, setModalState ] = useRecoilState(reporteModalState);

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
      };

    return (
      <>
  
        <Modal isOpen={modalState.open} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>Texto</div>
            </ModalBody>
  

          </ModalContent>
        </Modal>
      </>
    )
  }

  export default reporteModal;