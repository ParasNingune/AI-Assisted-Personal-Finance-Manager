import React, { useRef, useState } from 'react';
import {
  Box,
  Input,
  Center,
  VStack,
  Text,
  Image,
  useColorModeValue
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

export default function ProfilePhotoSelector({ image, setImage }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  return (
    <Box
      position="relative"
      width="120px"
      height="120px"
      borderRadius="full"
      borderWidth="1px"
      borderColor={borderColor}
      bg={inputBg}
      _hover={{
        borderColor: textColor,
        boxShadow: `0 0 0 1px ${textColor}`,
        transform: 'translateY(-2px)'
      }}
      transition="all 0.2s"
      onClick={() => inputRef.current.click()}
      boxShadow="0 1px 3px rgba(0,0,0,0.05)"
      cursor="pointer"
    >
      <Input
        id="profile-photo"
        type="file"
        accept="image/*"
        display="none"
        onChange={handleImageChange}
        ref={inputRef}
      />

      {image ? (
        <Image
          src={previewUrl}
          alt="Profile"
          width="100%"
          height="100%"
          objectFit="cover"
          borderRadius="full"
        />
      ) : (
        <Center height="100%">
          <VStack spacing={2}>
            <Box as={FaUser} boxSize="32px" color="gray.500" />
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              Upload Photo
            </Text>
          </VStack>
        </Center>
      )}
    </Box>
  );
}
