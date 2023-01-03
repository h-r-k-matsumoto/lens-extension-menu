/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import React from "react";
import { Renderer } from "@k8slens/extensions";

import type { PodShellMenuProps } from "./menu/pod/pod-shell-menu";
import { PodShellMenu } from "./menu/pod/pod-shell-menu";
import type { PodLogsMenuProps } from "./menu/pod/pod-logs-menu";
import { PodLogsMenu } from "./menu/pod/pod-logs-menu";
import type { NodeMenuProps } from "./menu/node/node-menu";
import { NodeMenu } from "./menu/node/node-menu";

export default class ExtentionMenuRendererExtension extends Renderer.LensExtension {
  kubeObjectMenuItems = [
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: PodShellMenuProps) => <PodShellMenu {...props} />,
      },
    },
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: PodLogsMenuProps) => <PodLogsMenu {...props} />,
      },
    },
    {
      kind: "Node",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: NodeMenuProps) => <NodeMenu {...props} />,
      },
    },
  ];
}
