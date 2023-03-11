/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import React from "react";
import { Renderer, Common } from "@k8slens/extensions";

const {
  Component: {
    createTerminalTab,
    terminalStore,
    MenuItem,
    Icon,
    SubMenu,
    StatusBrick,
  },
  Navigation,
} = Renderer;
const {
  Util,
  App,
} = Common;

type IPodContainer = Renderer.K8sApi.IPodContainer;
type KubeObjectMenuProps = Renderer.Component.KubeObjectMenuProps<Pod>;
type Pod = Renderer.K8sApi.Pod;

async function execShell(pod: Pod, container?: string) {

  const kubectlPath = App.Preferences.getKubectlPath() || "kubectl";
  const commandParts = [
    kubectlPath,
    "exec",
    "-i",
    "-t",
    "-n", pod.getNs(),
    pod.getName(),
  ];

  if (container) {
    commandParts.push("-c", container);
  }

  commandParts.push("--");
  commandParts.push('sh -c "clear; (bash || ash || sh)"');

  const shell = createTerminalTab({
    title: `Pod:${pod.getName()}`,
  });
  terminalStore.sendCommand(commandParts.join(" "), {
    enter: true,
    tabId: shell.id
  });

  Navigation.hideDetails();
}

export function PodShellMenu(props: KubeObjectMenuProps) {
  const { object: pod, toolbar } = props;
  const containers = pod.getRunningContainers();

  if (!containers.length) return null;

  return (
    <MenuItem onClick={Util.prevDefault(() => execShell(pod,containers[0].name))}>
      <Icon
        svg="ssh"
        interactive={toolbar}
        tooltip={toolbar && "Pod Shell"} 
      />
      <span className="title">Shell</span>
      {containers.length > 1 && (
        <>
          <Icon className="arrow" material="keyboard_arrow_right"/>
          <SubMenu>
            {
              containers.map((container: IPodContainer) => {
                const { name } = container;

                return (
                  <MenuItem
                    key={name}
                    onClick={Util.prevDefault(() => execShell(pod,name))}
                    className="flex align-center"
                  >
                    <StatusBrick/>
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
