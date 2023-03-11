/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import React from "react";
import { Renderer } from "@k8slens/extensions";

import { PodShellMenu } from "./menu/pod/pod-shell-menu";
import { PodLogsMenu } from "./menu/pod/pod-logs-menu";
import { NodeMenu } from "./menu/node/node-menu";

type Node = Renderer.K8sApi.Node;
type Pod = Renderer.K8sApi.Pod;

export default class ExtentionMenuRendererExtension extends Renderer.LensExtension {
  kubeObjectMenuItems = [
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: Renderer.Component.KubeObjectMenuProps<Pod>) => <PodShellMenu {...props} />,
      },
    },
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: Renderer.Component.KubeObjectMenuProps<Pod>) => <PodLogsMenu {...props} />,
      },
    },
    {
      kind: "Node",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: Renderer.Component.KubeObjectMenuProps<Node>) => <NodeMenu {...props} />,
      },
    },
  ];
}
