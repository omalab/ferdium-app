import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import Layout from '../components/settings/SettingsLayout';

// import RecipePreviewsStore from '../../stores/RecipePreviewsStore';
import UserStore from '../stores/UserStore';
import ServiceStore from '../stores/ServicesStore';
import Loader from '../components/ui/Loader';

import ServiceItem from '../components/settings/services/ServiceItem';

class PhoneSelector extends Component {
  componentWillUnmount() {
    this.props.actions.service.resetFilter();
    this.props.actions.service.resetStatus();
  }

  render() {
    const { services } = this.props.stores;
    const { closePhoneSelector } = this.props.actions.ui;

    const {
      setPhoneActive
    } = this.props.actions.service;
    const isLoading = services.allServicesRequest.isExecuting;

    const currentWSPhoneRecipes = services.currentWSPhoneRecipes;
    const allPhoneRecipes = services.allPhoneRecipes;

    return (
      <Layout
        closeSettings={closePhoneSelector}
      >
        <div className="theme__dark settings settings__main" style={{ display: 'block', zIndex: -1, borderRadius: '6px' }}>
          <h2 className="headEmail">
            Select phone app
          </h2>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
            {
              currentWSPhoneRecipes.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ paddingLeft: '25px', height: 'auto' }}>
                    No Phone Service Found in current workspaces
                  </div>
                  <hr />
                  <h1 style={{
                    margin: '15px',
                    padding: '10px 15px',
                    border: '1px #fff solid',
                    borderLeft: "0",
                    borderRight: '0'
                  }}>
                    Phone Services from all workspace
                  </h1>
                  <table className="service-table">
                    <tbody>
                      {allPhoneRecipes.map(service => (
                        <ServiceItem
                          key={service.id}
                          service={service}
                          goToServiceForm={() => { setPhoneActive({ serviceId: service.id }); }}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <table className="service-table">
                  <tbody>
                    {currentWSPhoneRecipes.map(service => (
                      <ServiceItem
                        key={service.id}
                        service={service}
                        goToServiceForm={() => { setPhoneActive({ serviceId: service.id }); }}
                      />
                    ))}
                  </tbody>
                </table>)
            }
          </div>
          )}
        </div>
      </Layout>
    );
  }
}

PhoneSelector.propTypes = {
  stores: PropTypes.shape({
    user: PropTypes.instanceOf(UserStore).isRequired,
    services: PropTypes.instanceOf(ServiceStore).isRequired,
    router: PropTypes.instanceOf(RouterStore).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    service: PropTypes.shape({
      setPhoneActive: PropTypes.func.isRequired
    }).isRequired,
    ui: PropTypes.shape({
      closePhoneSelector: PropTypes.func.isRequired
    })
  }).isRequired,
};

export default inject('stores', 'actions')(observer(PhoneSelector))