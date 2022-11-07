import {
    AspectRatio,
    Box,
    BoxProps,
    Container,
    forwardRef,
    Heading,
    Input,
    Stack,
    Text
  } from "@chakra-ui/react";
  import { motion, useAnimation } from "framer-motion";
  import React from 'react';
  
  const first = {
    rest: {
      rotate: "-15deg",
      scale: 0.95,
      x: "-50%",
      filter: "grayscale(80%)",
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeIn"
      }
    },
    hover: {
      x: "-70%",
      scale: 1.1,
      rotate: "-20deg",
      filter: "grayscale(0%)",
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut"
      }
    }
  };
  
  const second = {
    rest: {
      rotate: "15deg",
      scale: 0.95,
      x: "50%",
      filter: "grayscale(80%)",
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeIn"
      }
    },
    hover: {
      x: "70%",
      scale: 1.1,
      rotate: "20deg",
      filter: "grayscale(0%)",
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut"
      }
    }
  };
  
  const third = {
    rest: {
      scale: 1.1,
      filter: "grayscale(80%)",
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeIn"
      }
    },
    hover: {
      scale: 1.3,
      filter: "grayscale(0%)",
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut"
      }
    }
  };
  
  const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
    return (
      <Box
        bg="white"
        top="0"
        height="100%"
        width="100%"
        position="absolute"
        borderWidth="1px"
        borderStyle="solid"
        rounded="sm"
        borderColor="gray.400"
        as={motion.div}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundImage={`url("https://images.unsplash.com/photo-1600751550112-4209be589cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")`}
        {...props}
        ref={ref}
      />
    );
  });
  

  export default function Upload() {

    /*state = {
        file: null
    }

    handleFile(e){
        let file = e.target.files[0]
        this.setState({file: file})
    }*/

    const controls = useAnimation();
    const startAnimation = () => controls.start("hover");
    const stopAnimation = () => controls.stop();
    return (
      <Container my="12">
        <AspectRatio width="64" ratio={1} left="15%">
          <Box 
            borderColor="gray.300"
            borderStyle="dashed"
            borderWidth="2px"
            rounded="md"
            shadow="sm"
            role="group"
            transition="all 150ms ease-in-out"
            _hover={{
              shadow: "md"
            }}
            as={motion.div}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <Box position="relative" height="100%" width="100%">
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
              >
                <Stack
                  height="100%"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justify="center"
                  spacing="4"
                >
                  <Box height="16" width="12" position="relative">
                    <PreviewImage
                      variants={first}
                      backgroundImage="url('https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg')"
                    />
                    <PreviewImage
                      variants={second}
                      backgroundImage="url('https://images.unsplash.com/photo-1557487307-8dc8ec048eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')"
                    />
                    <PreviewImage
                      variants={third}
                      backgroundImage={`url("https://images.unsplash.com/photo-1600751550112-4209be589cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")`}
                    />
                  </Box>
                  <Stack p="8" textAlign="center" spacing="1">
                    <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                      Arrastra las fotos aquí
                    </Heading>
                    <Text fontWeight="light">o haz click para seleccionar</Text>
                  </Stack>
                </Stack>
              </Box>
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
                onDragEnter={startAnimation}
                onDragLeave={stopAnimation}
                //onChange={(e)=>this.handleFile(e)}
              />
            </Box>
          </Box>
        </AspectRatio>
      </Container>
    );
  }
  