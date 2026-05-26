"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { BsDatabase, BsDatabaseFill } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

export function UpdateUserModal({user}) {

    const handleUpdateUser = async(e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;
        console.log({name,image});

        await authClient.updateUser({
            name,
            image
        })
    }
    return (
        <Modal>
            <Button variant="secondary">
                <BiEdit></BiEdit> Update User
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <BsDatabaseFill className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Upadate User</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the form below and update your profile.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
                                    <TextField className="w-full" name="email" isDisabled type="email" defaultValue={user.email} variant="secondary">
                                        <Label>Email</Label>
                                        <Input placeholder="Enter your email" />
                                    </TextField>
                                    <TextField className="w-full" name="name" type="text" variant="secondary" defaultValue={user.name}>
                                        <Label>Name</Label>
                                        <Input placeholder="Enter your name" />
                                    </TextField>

                                    <TextField className="w-full" name="image" type="url" variant="secondary" defaultValue={user.image}>
                                        <Label>Image URL</Label>
                                        <Input placeholder="Enter your phone number" />
                                    </TextField>
                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close">Update</Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
