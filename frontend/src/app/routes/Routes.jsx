import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '@pages/Login'
import Chat from '@pages/Chat'
import Report from '@pages/Report'
import Users from '@pages/Users'
import Clients from '@pages/Clients'
import Channel from '@pages/Channel'
import Invitation from '@pages/Invitation'

import NotFount from '@pages/NotFount'

import { UserValidate, UserConsumer } from '@contexts/User'

import Layout from '@components/Layout'

export default () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route exact path="/invitation/:cliente_id" component={Invitation} />
    <Route path="/">
      {(props) => (
        <UserConsumer>
          {({ user }) => (
            <Layout user={user} {...props}>
              <UserValidate {...props} />
              <Route exact path="/" component={Chat} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/channel" component={Channel} />
              <Route exact path="/report" component={Report} />
              <Route exact path="/clients" component={Clients} />
              <Redirect from="*" to="/" />
            </Layout>
          )}
        </UserConsumer>
      )}
    </Route>
    <Route path="/404" component={NotFount} />
    <Redirect from="*" to="/" />
  </Switch>
)
