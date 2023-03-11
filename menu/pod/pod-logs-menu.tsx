/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import React from "react";
import { Renderer, Common } from "@k8slens/extensions";

const {
  Component: {
    logTabStore,
    MenuItem,
    Icon,
    SubMenu,
    StatusBrick,
  },
  Navigation,
} = Renderer;
const {
  Util,
} = Common;

type IPodContainer = Renderer.K8sApi.IPodContainer;
type KubeObjectMenuProps = Renderer.Component.KubeObjectMenuProps<Pod>;
type Pod = Renderer.K8sApi.Pod;
type PodStatus = Renderer.K8sApi.IPodContainerStatus;

export function PodLogsMenu(props: KubeObjectMenuProps) {
  const { object: pod, toolbar } = props;
  const containers = pod.getAllContainers();
  const statuses = pod.getContainerStatuses();

  if (!containers.length) return null;

  const showLogs = (container: IPodContainer)=>{
    console.log(`showLogs ${container.name}`)
    Navigation.hideDetails();
    logTabStore.createPodTab({
      selectedPod: pod,
      selectedContainer: container,
    });
  }

  return (
    <MenuItem onClick={Util.prevDefault(()=>showLogs(containers[0]))}>
      <Icon
        material="subject"
        interactive={toolbar}
        tooltip={toolbar && "Pod Logs"}
      />
      <span className="title">Logs</span>
      {containers.length > 1 && (
        <>
          <Icon className="arrow" material="keyboard_arrow_right"/>
          <SubMenu>
            {
              containers.map( (container:IPodContainer) => {
                const { name } = container;
                const status = statuses.find( (status:PodStatus) => status.name === name);
                const brick = status ? (
                  <StatusBrick
                    className={Util.cssNames(Object.keys(status.state)[0], { ready: status.ready })}
                  />
                ) : null;

                return (
                  <MenuItem
                    key={name}
                    onClick={Util.prevDefault(()=>showLogs(container))}
                    className="flex align-center"
                  >
                    {brick}
                    <span>{name}</span>
                  </MenuItem>
                );
              })
            }
          </SubMenu>
        </>
      )}
    </MenuItem>
  );
}
