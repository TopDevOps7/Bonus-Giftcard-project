/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {
  OutlinedInput,
  FormControl,
  InputAdornment,
  makeStyles,
  AppBar,
  Toolbar,
  // IconButton,
  Button,
  Hidden,
  useTheme,
  useMediaQuery,
  IconButton,
  // Menu,
  // MenuItem,
  // ListItemIcon,
  // ListItemText,
  // Badge,
  // withStyles,
} from "@material-ui/core";
// @material-ui/icons
import { Search, Tune } from "@material-ui/icons";
// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import FilterModal from "components/FilterModal/FilterModal";
import styles from "assets/jss/material-kit-react/components/headerStyle";

import logo from "assets/img/logo.png";

// const StyledBadge = withStyles(() => ({
//   badge: {
//     right: 0,
//     top: 15,
//   },
// }))(Badge);

const useStyles = makeStyles(styles);

const Header = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const { partnerId } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  // const handMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body.getElementsByTagName("header")[0].classList.remove(classes[color]);
      document.body.getElementsByTagName("header")[0].classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body.getElementsByTagName("header")[0].classList.add(classes[color]);
      document.body.getElementsByTagName("header")[0].classList.remove(classes[changeColorOnScroll.color]);
    }
  };

  const {
    color,
    rightLinks,
    leftLinks,
    brand,
    fixed,
    absolute,
    valueSearch,
    onChangeSearch,
    onClickSearch,
    onEnter,
    // rightList
  } = props;

  let homeUrl = "/";
  if (partnerId) {
    homeUrl += partnerId;
  }

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
    [classes.hiddenAppBar]: location.pathname !== homeUrl,
  });
  const brandComponent = <Button className={classes.title}>{brand}</Button>;
  return (
    <>
      <AppBar className={appBarClasses}>
        <div className={classes.container}>
          <div className={classNames(classes.mobileVersion)}>
            <Link to={homeUrl}>
              <img src={logo} className={classes.logo} alt="logo" draggable={false} />
            </Link>
            <Toolbar disableGutters className={classNames("cardBanner")} style={{ margin: "auto" }}>
              {leftLinks !== undefined ? brandComponent : null}
              <div className={classes.flex}>
                {leftLinks !== undefined ? (
                  <Hidden smDown implementation="css">
                    {leftLinks}
                  </Hidden>
                ) : (
                  <>
                    {location.pathname === homeUrl && !isMobile && (
                      <GridContainer style={{ width: "100%", paddingRight: 30 }}>
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl fullWidth variant="outlined" size="medium">
                            {/* <InputLabel htmlFor="outlined-adornment-filter">Buscar</InputLabel> */}
                            <OutlinedInput
                              style={{ width: "80%", borderRadius: 10, height: 56 }}
                              id="outlined-adornment-filter"
                              type="text"
                              placeholder="Buscar"
                              value={valueSearch}
                              onChange={onChangeSearch}
                              onKeyUp={onEnter}
                              startAdornment={
                                <InputAdornment position="start">
                                  <IconButton aria-label="search" component="span" onClick={onClickSearch}>
                                    <Search edge="start" />
                                  </IconButton>
                                </InputAdornment>
                              }
                              // labelWidth={50}
                            />
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                    )}
                  </>
                )}
              </div>
              {/* <Hidden smDown implementation="css"> */}
              {rightLinks}
              {/* </Hidden> */}
              {/* <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              aria-controls="top-menu-mobile"
              aria-haspopup="true"
              onClick={handMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="top-menu-mobile"
              anchorEl={anchorEl}
              keepMounted
              elevation={7}
              // style={{
              //   left: 0
              // }}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {rightList.map((list, ind) => (
                <MenuItem onClick={handleMenuClose} key={ind}>
                  <ListItemIcon style={{ minWidth: 35 }}>
                    {list.icon}
                  </ListItemIcon>
                  <Link to={list.link}>
                    <StyledBadge
                      showZero={false}
                      badgeContent={list.badgeCount}
                      color="secondary">
                      <ListItemText style={{
                        paddingRight: 30
                      }} primary={list.label} />
                    </StyledBadge>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Hidden> */}
            </Toolbar>
          </div>
          {location.pathname === homeUrl && isMobile && (
            <div className={classNames(classes.mobileSearch, "cardBanner")}>
              <OutlinedInput
                // margin="dense"
                className={classes.searchWithFilterBtn}
                type="text"
                placeholder="Buscar"
                value={valueSearch}
                onKeyUp={onEnter}
                onChange={onChangeSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton aria-label="search" component="span" onClick={onClickSearch}>
                      <Search edge="end" />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="settings" component="span" onClick={() => setMobileOpen(true)}>
                      <Tune />
                    </IconButton>
                  </InputAdornment>
                }
                // labelWidth={50}
              />
            </div>
          )}
        </div>
      </AppBar>
      <FilterModal open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger", "transparent", "white", "rose", "dark"]),
  rightLinks: PropTypes.node,
  rightList: PropTypes.array,
  valueSearch: PropTypes.string,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  onChangeSearch: PropTypes.func,
  onClickSearch: PropTypes.func,
  onEnter: PropTypes.func,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger", "transparent", "white", "rose", "dark"])
      .isRequired,
  }),
};

export default Header;
