import React from 'react'
import { useState, useEffect } from 'react'
import { Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Box, Image, button } from '@chakra-ui/react'
import Cookies from "universal-cookie";
import Router from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Divider} from "@chakra-ui/react";

export async function getServerSideProps(context) {
    try {
        const response = await axios.get(`${process.env.API_URL}/file/get/download/${context.query.imagenId}`, { responseType: 'arraybuffer' })
        const base64 = Buffer.from(response.data, 'binary').toString('base64')
        return {
            props: {
                base64: base64,
                data: response.data

            }
        }
    } catch (err) {
        return {
            props: {
                data: null

            }
        }
    }
}

const imagenid = ({ base64, data}) => {
    console.log(data)
    //direccion acutal
    console.log(context)
return (<>
        <img src={`data:image/jpeg;base64,${base64}`} />
    </>)

}

export default imagenid