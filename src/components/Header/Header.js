/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  OutlinedInput,
  FormControl,
  InputAdornment,
  makeStyles,
  AppBar,
  Toolbar,
  Hidden,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import { Search, Tune, Cancel } from "@material-ui/icons";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import FilterModal from "components/FilterModal/FilterModal";
import styles from "assets/jss/material-kit-react/components/headerStyle";
import { cleanFilters } from "redux/actions/home";
import { useDispatch } from "react-redux";
import Button from "components/CustomButtons/Button";
import { changePage } from "redux/actions/home";

const useStyles = makeStyles(styles);

const Header = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const { partnerId } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoPosition = useSelector(({ home }) => home.partner.configuration);
  const logo = useSelector(({ home }) => {
    if (sessionStorage.getItem("logo")) {
      return sessionStorage.getItem("logo");
    } else if (home.partner.configuration && home.partner.configuration.logo.image) {
      return home.partner.configuration.logo.image;
    } else {
      return "";
    }
  });

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

  const cleanFilter = () => {
    document.getElementById("outlined-adornment-filter").value = "";
    dispatch(cleanFilters());
  };

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

  const { color, rightLinks, leftLinks, brand, fixed, absolute, valueSearch, onChangeSearch, onClickSearch, onEnter } = props;

  let homeUrl = "/";
  let homeUrl_ = "/";
  if (partnerId) {
    homeUrl += partnerId;
    homeUrl_ += partnerId + "/";
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
            <Toolbar disableGutters className={classNames("cardBanner")} style={{ margin: "auto" }}>
              <Link to={homeUrl}>
                {logoPosition && (
                  <img
                    src={logo}
                    style={{
                      top: logoPosition.logo.top ? logoPosition.logo.top : 0,
                      left: logoPosition.logo.left ? logoPosition.logo.left : 0,
                      width: logoPosition.logo.width ? logoPosition.logo.width : 100,
                    }}
                    draggable={false}
                    onClick={() => {
                      document.getElementById("outlined-adornment-filter") &&
                        (document.getElementById("outlined-adornment-filter").value = "");
                      dispatch(cleanFilters());
                      dispatch(changePage(1));
                    }}
                  />
                )}
              </Link>
              {leftLinks !== undefined ? brandComponent : null}
              <div className={classes.flex}>
                {leftLinks !== undefined ? (
                  <Hidden smDown implementation="css">
                    {leftLinks}
                  </Hidden>
                ) : (
                  <>
                    {(location.pathname === homeUrl || location.pathname === homeUrl_) && !isMobile && (
                      <GridContainer style={{ width: "100%", paddingRight: 30 }}>
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl fullWidth variant="outlined" size="medium">
                            <OutlinedInput
                              style={{
                                width: "70%",
                                borderRadius: 10,
                                height: 50,
                                marginLeft: "15%",
                              }}
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
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton aria-label="cancel" component="span" onClick={cleanFilter}>
                                    <Cancel edge="end" />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                    )}
                  </>
                )}
              </div>
              {rightLinks}
            </Toolbar>
          </div>
          {(location.pathname === homeUrl || location.pathname === homeUrl_) && isMobile && (
            <div className={classNames(classes.mobileSearch, "cardBanner")}>
              <GridContainer className={classNames(classes.mobileSearchbar)}>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl fullWidth variant="outlined" size="medium">
                    <OutlinedInput
                      style={{
                        width: "90%",
                        borderRadius: 10,
                        height: 56,
                        marginTop: 10,
                      }}
                      id="outlined-adornment-filter"
                      type="text"
                      placeholder="Buscar"
                      value={valueSearch}
                      onChange={onChangeSearch}
                      onKeyUp={onEnter}
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton aria-label="search" component="span" onClick={onClickSearch}>
                            <Search edge="end" />
                          </IconButton>
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="cancel" component="span" onClick={cleanFilter}>
                            <Cancel edge="end" />
                          </IconButton>
                          <IconButton aria-label="settings" component="span" onClick={() => setMobileOpen(true)}>
                            <Tune />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
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
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger", "transparent", "white", "rose", "dark"])
      .isRequired,
  }),
};

export default Header;
