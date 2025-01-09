// import React from 'react';
// import { Navbar, Nav, Button, Container } from 'react-bootstrap';
// import { NavLink as RouterLink, useNavigate } from 'react-router';
// import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
// import { logoutThunk } from '../../4_features/auth/model/authThunks';
// import { AuthStatus } from '../../4_features/auth/model/auth.types';
// import { FaPlus } from 'react-icons/fa';

// export default function Header(): React.JSX.Element {
//   const data = useAppSelector((store) => store.auth.data);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   return (
//     <header>
//       <Navbar expand="lg" className="bg-white shadow-sm py-3">
//         <Container className="d-flex justify-content-between align-items-center">
//           {/* Логотип и ссылки слева */}
//           <div className="d-flex align-items-center">
//             <Navbar.Brand as={RouterLink} to="/" className="d-flex align-items-center">
//               <span style={{ fontWeight: 'bold', fontSize: '1.5rem', marginRight: '10px' }}>
//                 Эльбрус
//               </span>
//               <span style={{ fontSize: '1.5rem', fontWeight: 'lighter' }}>Заметки</span>
//             </Navbar.Brand>
//             <Nav className="d-flex align-items-center">
//               <Nav.Link as={RouterLink} to="/">
//                 Главная
//               </Nav.Link>
//               <Nav.Link as={RouterLink} to="/notes">
//                 Notes
//               </Nav.Link>
//             </Nav>
//           </div>

//           {/* Кнопка "Добавить заметку" */}
//           {data.status === AuthStatus.authenticated && (
//             <div>
//               <Button
//                 variant="link"
//                 onClick={() => navigate('/notes/add')}
//                 className="d-flex align-items-center justify-content-center"
//                 style={{
//                   padding: '0',
//                   border: 'none',
//                   backgroundColor: 'transparent',
//                   color: 'black',
//                   fontSize: '1rem',
//                   textDecoration: 'none',
//                 }}
//               >
//                 <FaPlus className="me-2" /> Добавить заметку
//               </Button>
//             </div>
//           )}

//           {/* Информация о пользователе и управление */}
//           <div className="d-flex align-items-center">
//             {data.status === AuthStatus.authenticated ? (
//               <>
//                 <span className="me-3" style={{ fontWeight: 'bold' }}>
//                   {data.user.name}
//                 </span>
//                 <Button
//                   variant="outline-danger"
//                   onClick={() => {
//                     void dispatch(logoutThunk());
//                   }}
//                 >
//                   Выход
//                 </Button>
//               </>
//             ) : (
//               <div className="d-flex align-items-center">
//                 <Nav.Link as={RouterLink} to="/auth/login" className="btn btn-outline-primary me-2">
//                   Login
//                 </Nav.Link>
//                 <Nav.Link as={RouterLink} to="/auth/signup" className="btn btn-outline-success">
//                   Signup
//                 </Nav.Link>
//               </div>
//             )}
//           </div>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink as RouterLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { logoutThunk } from '../../4_features/auth/model/authThunks';
import { AuthStatus } from '../../4_features/auth/model/auth.types';

export default function Header(): React.JSX.Element {
  const data = useAppSelector((store) => store.auth.data);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  return (
    <header>
      <Navbar
        expand="lg"
        className="py-3"
        style={{
          backgroundColor: 'transparent', // Прозрачный фон
        }}
      >
        <Container className="d-flex justify-content-center align-items-center">
          {/* Логотип по центру */}
          <Navbar.Brand as={RouterLink} to="/" className="text-center">
            <span style={{ fontWeight: 'bold', fontSize: '1.8rem', color: 'white' }}>Эльбрус </span>
            <span style={{ fontSize: '1.8rem', fontWeight: 'lighter', color: 'white' }}>
              &nbsp;Моя Игра
            </span>
          </Navbar.Brand>
        </Container>
        <Container className="d-flex justify-content-between align-items-center">
          {/* Ссылки */}
          <Nav className="d-flex align-items-center">
            {/* <Nav.Link as={RouterLink} to="/" style={{ color: 'white' }}>
              Главная
            </Nav.Link> */}
            {/* <Nav.Link as={RouterLink} to="/notes" style={{ color: 'white' }}>
              Notes
            </Nav.Link> */}
          </Nav>

          {/* Информация о пользователе и управление */}
          <div className="d-flex align-items-center">
            {data.status === AuthStatus.authenticated ? (
              <>
                <span className="me-3" style={{ fontWeight: 'bold', color: 'white' }}>
                  {data.user.name}
                </span>
                <Button
                  variant="outline-light"
                  onClick={() => {
                    void dispatch(logoutThunk());
                  }}
                >
                  Выход
                </Button>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <Nav.Link as={RouterLink} to="/auth/login" className="btn btn-outline-primary me-2">
                  Login
                </Nav.Link>
                <Nav.Link as={RouterLink} to="/auth/signup" className="btn btn-outline-success">
                  Signup
                </Nav.Link>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
}
