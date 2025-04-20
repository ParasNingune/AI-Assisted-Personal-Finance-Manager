import React, {useContext} from 'react';
import { UserContext } from '../context/UserContext';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';

const DashboardLayout = ({children, activeMenu}) => {
    const {user} = useContext(UserContext)

    return (
        <Box>
            <Navbar activeMenu={activeMenu} />

            {user && (
                <Box>
                    <Box>
                    </Box>

                    <Box>
                        {children}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default DashboardLayout;