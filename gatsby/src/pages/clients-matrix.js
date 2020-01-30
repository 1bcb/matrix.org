import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../components'
import config from '../../config'

const ClientsMatrix = ({data}) => {
  const clients = data.allMdx.edges.map((edge => {
    var result = edge.node.frontmatter;
    result.slug = edge.node.fields.slug;
    return result;
  }));
  clients.forEach((client, i) => {
    clients[i].platforms = clients[i].platforms ? clients[i].platforms : []
    clients[i].platformString = clients[i].platforms.join(',').replace(' ', '');
  });

  return (<Layout navmode="discover">
      <MXContentMain>
        <Helmet title={`Clients | ${config.siteTitle}`}>
          <script src="/js/jquery-3.4.1.min.js" type="text/javascript"></script>
          <script type="text/javascript" src="/js/clients-control.js"></script>
        </Helmet>
        
          <h1>Clients Matrix</h1>
          <p>To connect to the Matrix federation, you will use a client. These are some of the most popular Matrix clients available today, and more are available at  <a href="/docs/projects/try-matrix-now/">try-matrix-now</a>. To get started using Matrix, pick a client and join <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a></p>
          <div className="mxgrid mxgrid--clients">
            <div className="mxgrid_item33">
              <h3 style={{"line-height": "0px", "padding-bottom": "10px"}}>
                Select your platform:
              </h3>
            </div>
            <div className="mxgrid_item33 mxgrid_item33--clients"></div>
            <div className="mxgrid_item33 mxgrid_item33--clients"></div>
            <div className="mxgrid_item33 mxgrid_item33--clients">
              <input type="radio" name="platform" id="all" /><label htmlFor="all"> All</label>
            </div>
            <div className="mxgrid_item33 mxgrid_item33--clients"></div>
            <div className="mxgrid_item33 mxgrid_item33--clients"></div>
            <div className="mxgrid_item33 mxgrid_item33--clients">
              <input type="radio" name="platform" id="linux" /><label htmlFor="linux"> Linux</label>
            </div>
            <div className="mxgrid_item33 mxgrid_item33--clients">
              <input type="radio" name="platform" id="mac" /><label htmlFor="mac"> MacOS</label>
            </div>
            <div className="mxgrid_item33 mxgrid_item33--clients">
              <input type="radio" name="platform" id="windows" /><label htmlFor="windows"> Windows</label>
            </div>
            <div className="mxgrid_item33 mxgrid_item33--clients">
              <input type="radio" name="platform" id="android" /><label htmlFor="android"> Android</label>
            </div>
            <div className="mxgrid_item33 mxgrid_item33--clients">
              <input type="radio" name="platform" id="ios" /><label htmlFor="ios"> iOS</label>
            </div>
            <div className="mxgrid_item33 mxgrid_item33--clients">
              <input type="radio" name="platform" id="ubuntutouch" /><label htmlFor="ubuntutouch"> Ubuntu Touch</label>
            </div>
          </div>

          <h2 id="platform-availability">Platform Availability</h2>
          <div className="overscroll">
          <table className="legacy-table width-100">
            <thead>
              <tr>
                <th style={{'width': '15%'}}> </th>
                {clients.map(function(client, i) {
                  return (
                    <th data-platforms={client.platformString}>{client.title}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>{
              ["Linux","Mac","Windows","Android","iOS","Ubuntu Touch","Web","Nintendo 3DS"].map(function(platform) {
                return (<tr>
                  <td>{platform}</td>
                  {clients.map(function(client, i) {
                    var platformSupport =  "";
                    var platformClass = "";
                    if (client.platforms.indexOf(platform) !== -1) {
                      platformClass = "green";
                      platformSupport = "✓";
                    }

                    return (
                      <td className={platformClass} data-platforms={client.platformString}>{platformSupport}</td>
                    )
                  })}
                </tr>)
              })}
            </tbody>
          </table>
          </div>
          <h2 id="details">Details</h2>
          <div className="overscroll">
          <table className="legacy-table width-100">
            <thead>
              <tr>
                <th style={{'width': '15%'}}> </th>
                {clients.map(function(client, i) {
                  return (
                    <th data-platforms={client.platformString}>{client.title}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Repo</td>
                {clients.map(function(client, i) {
                    return (
                      <td data-platforms={client.platformString}>
                        <a href={client.repo}>{client.repo.split('/')[2]}</a>
                      </td>
                    )
                  })}
              </tr>
              <tr>
                <td>Matrix Room</td>
                {clients.map(function(client, i) {
                    return (
                      <td data-platforms={client.platformString}>
                        <small><a href={"https://matrix.to/#/" + client.room}>{client.room}</a></small>
                      </td>
                    )
                  })}
              </tr>
            {
              ["language","SDK"].map(function(detail) {
                return (<tr>
                  <td>{detail.charAt(0).toUpperCase() + detail.slice(1)}</td>
                  {clients.map(function(client, i) {
                    return (
                      <td data-platforms={client.platformString}>{client[detail]}</td>
                    )
                  })}
                </tr>)
              })}
            </tbody>
          </table>
          </div>
          <h2 id="features">Features</h2>
          <div className="overscroll">
          <table className="legacy-table width-100">
            <thead>
              <tr>
                <th style={{'width': '15%'}}> </th>
                {clients.map(function(client, i) {
                  return (
                    <th data-platforms={client.platformString}>{client.title}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>{
              Object.keys(clients[0].features).map(function(feature) {
                return (<tr>
                  <td>{feature.replace(/_/g, ' ')}</td>
                  {clients.map(function(client, i) {
                    if (!client.features) client.features = {}
                    var featureSupport = client.features[feature];
                    var featureClass = "";
                    if (client.features[feature] === "yes") {
                      featureClass = "green";
                      featureSupport = "✓";
                    }
                    if (client.features[feature] === "no") {
                      featureClass = "red";
                      featureSupport = "✗";
                    }
                    return (
                      <td className={featureClass} data-platforms={client.platformString}>{featureSupport}</td>
                    )
                  })}
                </tr>)
              })}
            </tbody>
          </table>
          </div>
        </MXContentMain>
    </Layout>)
}


export const query = graphql`{
 allMdx(filter: {
   frontmatter: {
     categories: {in: ["client"]},
     platforms: {ne: null}
   }
 }) {
   edges {
     node {
       frontmatter {
         title
         author
         maturity
         description
         thumbnail
         bridges
         repo
         language
         room
         platforms
         SDK
         featured
         features {
           Room_directory
           Room_tag_showing
           Room_tag_editing
           Search_joined_rooms
           Room_user_list
           Display_Room_Description
           Edit_Room_Description
           Highlights
           Pushrules
           Send_read_markers
           Display_read_markers
           Sending_Invites
           Accepting_Invites
           Typing_Notification
           E2E
           Replies
           Attachment_uploading
           Attachment_downloading
           Send_stickers
           Send_formatted_messages__markdown_
           Rich_Text_Editor_for_formatted_messages
           Display_formatted_messages
           Redacting
           Multiple_Matrix_Accounts
           New_user_registration
           voip
         }
       }
       fields {
         slug
       }
     }
   }
 }
}`
export default ClientsMatrix
